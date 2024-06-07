const express = require('express')
const db = require('./db.js');
const cors = require('cors'); // Import cors


const app = express()
app.use(cors())
const port = 5000


function add_todo(title,description,completed){
    db.query('insert into todo (Title,Description,Completed) values (?,?,?)',[title,description,completed],(error,results,fields)=>{
        if(error){
            console.log(error);
        }
    }
)
}

app.get('/', (req, res) => {
  res.send('Hello Wssorld!')
})

app.get('/addTodo', (req, res) => {
    const {title, description, completed} = req.query;
    add_todo(title, description, completed);
    res.send('Todo added successfully');
});



app.get('/getTodos', (req, res) => {
    db.query('SELECT * FROM todo', (error, results, fields) => {
        if (error) {
            res.status(500).send('Error retrieving todos from the database');
        } else {
            res.json(results);
          
        }
    });
});

app.get('/deleteTodo', (req, res) => {
    const {id} = req.query;
    db.query('DELETE FROM todo WHERE Id = ?', id, (error, results, fields) => {
        if (error) {
            res.status(500).send('Error deleting todo from the database');
        } else {
            res.send('Todo deleted successfully');
        }
    });
});
// app.get('/updateTodo', (req, res) => {
//     const {id} = req.query;
//     db.query('UPDATE todo SET Completed = 1 WHERE Id = ?', id, (error, results, fields) => {
//         if (error) {
//             res.status(500).send('Error updating todo from the database');
//         } else {
//             res.send('Todo updated successfully');
//         }
//     });
// });

app.get('/updateTodo', (req, res) => {
    const { id, title, description, completed } = req.query;
    const query = 'UPDATE todo SET Title = ?, Description = ?, Completed = ? WHERE Id = ?';
    db.query(query, [title, description, completed, id], (error, results) => {
        if (error) throw error;
        res.send('Todo updated successfully');
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})