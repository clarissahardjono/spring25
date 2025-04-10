const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');

  const kittySchema = new mongoose.Schema({
    name: String
  });

  const Kitten = mongoose.model('Kitten', kittySchema);

  const silence = new Kitten({ name: 'Silence' });
  const fluffy = new Kitten({ name: 'fluffy' });

  await silence.save();
  await fluffy.save();

  console.log('Documents saved!');
}

main().catch(err => console.log(err));
