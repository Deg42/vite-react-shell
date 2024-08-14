import { Schema, model, Document } from 'mongoose';

export interface Task extends Document {
    title: string;
    checks: { label: string; done: boolean }[];
    status: number;
}

const TaskSchema = new Schema<Task>({
    title: { type: String, required: true },
    checks: [
        {
            label: { type: String, required: true },
            done: { type: Boolean, default: false },
        },
    ],
    status: { type: Number, default: 0 },
});

const TaskModel = model<Task>('Task', TaskSchema, 'tasks');
export default TaskModel;