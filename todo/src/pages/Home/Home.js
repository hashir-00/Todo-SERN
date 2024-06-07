import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

export default function Home() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const addTask = (title, description) => {
        console.log('Adding task');
        if (title === '' || description === '') {
            alert('Please enter a title and description');
            return;
        }
        fetch(`http://localhost:5000/addTodo?title=${title}&description=${description}&completed=0`)
            .then(() => getTodos())
            .then(() => setTitle(''))
            .then(() => setDescription(''));
    };

    const getTodos = () => {
        console.log('Getting todos');
        fetch('http://localhost:5000/getTodos')
            .then(response => response.json())
            .then(data => setTodos(data));
    };

    const deleteTodo = (id) => {
        console.log('Deleting todo');
        fetch(`http://localhost:5000/deleteTodo?id=${id}`)
            .then(() => getTodos());
    };

    const updateTodo = (id, title, description, completed) => {
        console.log('Updating todo');
        fetch(`http://localhost:5000/updateTodo?id=${id}&title=${title}&description=${description}&completed=${completed}`)
            .then(() => getTodos());
    };

    const startEditing = (todo) => {
        setEditingTodo(todo);
        setEditTitle(todo.Title);
        setEditDescription(todo.Description);
    };

    const saveEdit = () => {
        if (editingTodo) {
            updateTodo(editingTodo.Id, editTitle, editDescription, editingTodo.Completed);
            setEditingTodo(null);
            setEditTitle('');
            setEditDescription('');
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Container>
            <div className="addTodo">
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Add Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Add Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </InputGroup>
                <Button variant="primary" onClick={() => addTask(title, description)}>Add</Button>
            </div>

            <div className="TODOS">
                <Row>
                    {todos.map((todo, index) => (
                        <Col key={index} sm={12} md={6} lg={4}>
                            <Card className="todo-item">
                                <Card.Body>
                                    <Card.Title>Title - {todo.Title}</Card.Title>
                                    <Card.Text>Description - {todo.Description}</Card.Text>
                                    <Card.Text>Status - {todo.Completed === 0 ? "Incomplete" : "Complete"}</Card.Text>
                                    <Button variant="primary" onClick={() => startEditing(todo)}>Edit</Button>
                                    <Button variant="danger" onClick={() => deleteTodo(todo.Id)}>Delete</Button>
                                    <Form.Check
    type="checkbox"
    label="Mark as Complete"
    checked={todo.Completed === 1}
    onChange={(e) => {
        const completed = e.target.checked ? 1 : 0;
        updateTodo(todo.Id, todo.Title, todo.Description, completed);
    }}
/>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {editingTodo && (
                <Modal show={true} onHide={() => setEditingTodo(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Edit Title"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Edit Description"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setEditingTodo(null)}>Close</Button>
                        <Button variant="primary" onClick={saveEdit}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}
