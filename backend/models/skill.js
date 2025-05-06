import { Schema, model } from 'mongoose';

const skillSchema = new Schema({
  title: {
    type: String,
    required: true,
  }
})

const Skill = model('Skill', skillSchema);

export default Skill;
