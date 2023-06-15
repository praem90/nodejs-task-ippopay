
import { Schema, model, now, models} from 'mongoose';

interface IPasswordValidation {
    password: string;
    steps: number;
    message: string;
    created: Date
}
  
const passwordValidationSchema = new Schema<IPasswordValidation>({
    password: { type: String, required: true },
    steps: { type: Number, required: true },
    message: { type: String, required: true },
    created: {type: Date, required: false, default: now()}  
});


export const PasswordValidation = models.PasswordValidation ||  model<IPasswordValidation>('PasswordValidation', passwordValidationSchema);