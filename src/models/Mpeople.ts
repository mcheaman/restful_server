import mongoose, {Schema} from 'mongoose';
import Ipeople from '../interfaces/Ipeople';

const PeopleSchema: Schema = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        occupation: {type: String},
        age: {type: String, required: true},

    },
    {
        timestamps: true
    }
);

export default mongoose.model<Ipeople>('People', PeopleSchema);