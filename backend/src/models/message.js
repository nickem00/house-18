import moongoose from 'mongoose';

const messageSchema = new moongoose.messageSchema({
    name: { type: String, reqiured: true, trim: true},
    email: { type: String, reqiured: true, trim: true},
    subject: { type: String, reqiured: true, trim: true},
    message: { type: String, reqiured: true, trim: true},
    createdAt: { type: Date, default: Date.now }
});

export default moongoose.model('Message', messageSchema);