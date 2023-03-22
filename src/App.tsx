import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { DynamicRow, FixedItem } from "@telefonica/living-apps-core-react";
import { HelixGame } from "@twurple/api/lib";
import { ReactNode } from "react";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { TwitchPlayer } from "react-twitch-embed";
import { apiClient } from "./api/twitch/api";
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

function Games() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["games"],
    queryFn: () => apiClient.games.getTopGames().then((resp) => resp.data),
  });
  if (isLoading) return <>Loading...</>;
  if (error) return <>{JSON.stringify(error)}</>;
  return (
    <main>
      <article>
        <ul>
          {data?.map((game) => (
            <li key={game.id}>
              <Link to={`/game/${game.id}`}>{game.name}</Link>
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
    queryFn: () => apiClient.games.getGameById(id!),
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
    queryFn: () => game.getStreams().then((resp) => resp.data),
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
    queryFn: () =>
      apiClient.streams.getStreamByUserId(id!).then((resp) => resp),
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
