import mongoose, { Document, Schema, Types } from "mongoose";

const taskStatus = {
    PENDING: 'pending',    
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'uderReview',
    COMPLETED: 'completed'
} as const

export type TaskStatus = typeof taskStatus [keyof typeof taskStatus];

//TypeScript
export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId;
    status: TaskStatus;
}

//Moongoose
export const TypeSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    }
}, {timestamps: true});

const Task = mongoose.model<ITask>('Task', TypeSchema);
export default Task;