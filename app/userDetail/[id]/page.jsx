import { notFound } from 'next/navigation';

export default async function UserDetailPage({ params }) {
  const { id } = params;

  const response = await fetch(`https://dummyjson.com/users/${id}`);
  const todoResponse = await fetch(`https://dummyjson.com/users/${id}/todos`);

  if (!response.ok || !todoResponse.ok) {
    return notFound();
  }

  const user = await response.json();
  const todos = await todoResponse.json();

  return (
    <div className='PostDetailId'>
      <div className="InformationBox">
        <div className="UserPhoto">
          <img src={user.image} alt={user.firstName} />
          <h1>{user.firstName} {user.lastName}</h1>
        </div>
        <div className="PersonalInfo">
          <div className="Iletisim">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> @{user.username}</p>
            <p><strong>Yaş:</strong> {user.age}</p>
            <p><strong>Telefon:</strong> {user.phone}</p>
          </div>
          <div className="Address">
            <p><strong>Address:</strong> {user.address.address}</p>
            <p><strong>City:</strong>{user.address.city}</p>
            <p><strong>State:</strong>{user.address.state}</p>
            <p><strong>Country:</strong>{user.address.country}</p>
          </div>
        </div>
      </div>
      <div className="Todos">
        <h2>To Do List</h2>
        {todos.todos.length === 0 ? (
          <p>Henüz hiç To Do yok.</p>
        ) : (
          <ul>
            {todos.todos.map((todo) => (
              <li key={todo.id}
                style={{
                  border: '2px solid',
                  borderColor: todo.completed ? '#FFF2F0' : '#F0FAF0',
                  backgroundColor: todo.completed ? '#FFF2F0' : '#F0FAF0',
                  padding: '10px',
                  marginBottom: '10px'
                }}
              >
                <p><strong>Todo:</strong> {todo?.todo || "Görev yok."}</p>
                <span style={{ color: todo.completed ? 'red' : 'green' }}>
                  {todo.completed ? 'Completed' : 'Pending'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
