import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";
import { HelixGame } from "@twurple/api/lib";
import { ReactNode, useEffect } from "react";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useParams
} from "react-router-dom";
import { TwitchPlayer } from "react-twitch-embed";
import { getStreams } from "./api/backend";
import {
  getGameById,
  getGameStreamsByGameId as getGameStreams, getUserStreamsByUserId
} from "./api/twitch";
import "./App.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Games />,
  },
  {
    path: "/game/:id",
    element: (
      <Layout>
        <Game />
      </Layout>
    ),
  },
  {
    path: "/stream/:id",
    element: (
      <Layout>
        <Stream />
      </Layout>
    ),
  },
]);

function App() {
  useEffect(() => {
    getStreams().then((res) => console.dir(res));
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

function Games() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["streams"],
    queryFn: () => getStreams(),
  });
  if (isLoading) return <>Loading...</>;
  if (error) return <>{JSON.stringify(error)}</>;
  return (
    <main>
      <article>
        <ul>
          {data?.map((stream: any) => (
            <li key={stream.id}>
              <Link to={`/stream/${stream.id}`}>{stream.display_name}</Link>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <p style={{ fontSize: 32 }}>
        <Link to="/">&larr;</Link>
      </p>
      <div>{children}</div>
    </>
  );
}

function Game() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useQuery({
    queryKey: ["games", id],
    queryFn: () => getGameById(id!),
  });
  if (isLoading) return <>Loading...</>;
  if (error || !data) return <>{JSON.stringify(error)}</>;
  return (
    <>
      <p>{data?.name}</p>
      <Streams game={data} />
    </>
  );
}

function Streams({ game }: { game: HelixGame }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["games", game.id, "streams"],
    queryFn: () => getGameStreams(game),
  });
  if (isLoading) return <>Loading...</>;
  if (error) return <>{JSON.stringify(error)}</>;
  return (
    <ul>
      {data?.map((stream) => (
        <li key={stream.id}>
          {stream.userName} playing {stream.gameName} ({stream.title}):{" "}
          <Link to={`/stream/${stream.userId}`}>Link</Link>
          <img
            src={stream.getThumbnailUrl(480, Math.floor(480 / (16 / 9)))}
            alt=""
          />
        </li>
      ))}
    </ul>
  );
}

function Stream() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useQuery({
    queryKey: ["stream", id],
    queryFn: () => getUserStreamsByUserId(id!),
  });
  if (isLoading) return <>Loading...</>;
  if (error || !data) return <>{JSON.stringify(error)}</>;
  return (
    <TwitchPlayer
      id={id}
      channel={data.userName}
      autoplay={true}
      title="Embed Twich Player"
    />
  );
}

export default App;
