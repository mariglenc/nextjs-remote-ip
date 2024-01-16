
export default function Home(props) {
  const ip = props.ip;
  const way = props.way;
  return (
    <div style={{ width: '100vw', height: '100vh', padding: 30 }}>
      <h1>
        IP Address <span style={{ color: 'blue' }}>{ip}</span>
      </h1>
      <h1>
        Way of getting <span style={{ color: 'blue' }}>{way}</span>
      </h1>
    </div>
  );
}

export async function getServerSideProps(context) {

  const { req } = context;

  let ip;
  let way;
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
    way = 'x-forwarded-for'
  } else if (req.headers['x-real-ip']) {
    ip = req.connection.remoteAddress;
    way = 'x-real-ip'
  } else {
    ip = req.connection.remoteAddress;
    way = 'connection.remoteAddress'
  }

  console.log(ip);
  return {
    props: {ip,way },
  };
}
