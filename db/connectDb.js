import mongoose from 'mongoose'

const connectDB = async()=>{
  mongoose.connect('mongodb://127.0.0.1:27017/chai').
  catch(error => handleError(error));
try {
  await mongoose.connect('mongodb://127.0.0.1:27017/chai');
} catch (error) {
  handleError(error);
}
}
export default connectDB;