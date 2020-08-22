import mongoose from 'mongoose';
import Todo from '../todoModel';

export default async function todoCreate(req, res) {
  const _id = new mongoose.Types.ObjectId();

  const todo = new Todo({
    _id,
    name: req.body.name,
    description: req.body.description,
    done: req.body.done || false,
  });

  todo
    .save()
    .then(() => {
      const todoOrderId = req.body.todoOrderPayload.id;
      const newTodoOrder = req.body.todoOrderPayload.todoOrder;
      newTodoOrder.push(todo._id);

      return Todo.update(
        { _id: todoOrderId },
        { $set: { name: 'todoOrder', description: JSON.stringify(newTodoOrder) } },
      ).exec();
    })
    .then(doc => {
      if (doc.n) {
        res.status(200).json('Todo created and todoOrder updated');
      } else {
        res.status(400).json('Todo not found');
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}
