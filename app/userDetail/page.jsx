import Link from "next/link";

export default async function UsersPage() {
  const { users } = await fetch("https://dummyjson.com/users").then(res => res.json());

  return (
    <div className="UsersContainer">
      <ul>
        {users.map(x => (
          <li key={x.id}>
            <img src={x.image} />
            <h3>{x.firstName} {x.lastName}</h3>
            <p>@{x.username}</p>
            <h5>📧 {x.email}</h5>
            <Link href={`/userDetail/${x.id}`}><h4>• Kullanıcı Detayı</h4></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
