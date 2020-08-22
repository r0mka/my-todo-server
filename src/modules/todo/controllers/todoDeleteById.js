import Todo from '../todoModel';

const todoDeleteById = (req, res) => {
  const id = req.params.todoId;
  Todo.remove({ _id: id })
    .exec()
    .then(() => {
      const todoOrderId = req.body.todoOrderPayload.id;
      const newTodoOrder = req.body.todoOrderPayload.todoOrder;

      return Todo.update(
        { _id: todoOrderId },
        { $set: { name: 'todoOrder', description: JSON.stringify(newTodoOrder) } },
      ).exec();
    })
    .then(doc => {
      if (doc.n) {
        res.status(200).json('Todo deleted and todoOrder updated');
      } else {
        res.status(400).json('Todo not found');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

export default todoDeleteById;
