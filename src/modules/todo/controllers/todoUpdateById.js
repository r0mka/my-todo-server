import Todo from '../todoModel';

export default async function todoUpdateById(req, res) {
  const id = req.params.todoId;

  let data;

  if (req.body.todoOrderPayload) {
    const newTodoOrder = req.body.todoOrderPayload.todoOrder;
    data = { name: 'todoOrder', description: JSON.stringify(newTodoOrder) };
  } else {
    data = req.body;
  }

  Todo.update({ _id: id }, { $set: data })
    .exec()
    .then(doc => {
      if (doc.n) {
        res.status(200).json('Todo updated');
      } else {
        res.status(400).json('Todo not found');
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}
