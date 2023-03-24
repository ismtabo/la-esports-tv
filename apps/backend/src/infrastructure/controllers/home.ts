import { Router } from "express";
import { chain, merge } from "lodash";
import { first, flatMap, map, pipe } from "lodash/fp";
import { getLiveStreams } from "../lolesports";
import { Live } from "../lolesports/types";
import { getUserStreamsByUserNames } from "../twitch";

const router = Router();

router.get("/", async (_req, res) => {
  const liveStreams = await getLiveStreams()
    .then((data: Live) => data.data.schedule.events)
    .then((events) => events.filter((event) => event.state === "inProgress"));
  const streams = chain(liveStreams);
  const leagues = streams.map("league").value();
  const streamsNames: string[] = streams
    .flatMap("streams")
    .map("parameter")
    .value();
  const twitchStreams = chain(await getUserStreamsByUserNames(streamsNames))
    .groupBy("user_login")
    .mapValues(first)
    .value();
  const groupedLiveStreams = chain(liveStreams)
    .groupBy("league.id")
    .mapValues(pipe(flatMap("streams"), map("parameter"), first))
    .value();
  const teams = streams
    .flatMap("match.teams")
    .groupBy("id")
    .mapValues(first)
    .values();
  const teamALiveStreams = chain(liveStreams)
    .groupBy("match.teams.0.id")
    .mapValues(pipe(flatMap("streams"), map("parameter"), first))
    .value();
  const teamBLiveStreams = chain(liveStreams)
    .groupBy("match.teams.1.id")
    .mapValues(pipe(flatMap("streams"), map("parameter"), first))
    .value();
  const groupedTeamLiveStreams = merge(teamALiveStreams, teamBLiveStreams);
  console.log(
    JSON.stringify({ teams, teamLiveStreams: groupedTeamLiveStreams })
  );
  const leaguesWithStreams = leagues.map((league) => {
    const streamLogin = groupedLiveStreams[league.id];
    const stream = twitchStreams[streamLogin];
    return {
      title: league.name,
      twitch_id: stream?.user_login,
      type: "stream",
      pics: {
        thumb: stream?.thumbnail_url
          .replace("{width}", "384")
          .replace("{height}", "216"),
        big: "",
      },
    };
  });
  const teamsWithStreams = teams.filter(Boolean).map((team: any) => {
    const streamLogin = groupedTeamLiveStreams[team.id];
    const stream = twitchStreams[streamLogin];
    return {
      title: team.name,
      twitch_id: stream?.user_login,
      type: "stream",
      pics: {
        thumb: team.image.replace("http", "https"),
        big: "",
      },
    };
  });
  res.json({
    title: "Home",
    preview_id: "",
    pics: {
      thumb: "",
      big: "",
    },
    layout: "root",
    groups: [
      {
        title: "eSports",
        preview_id: "1768545710",
        pics: {
          thumb: "",
          big: "",
        },
        layout: "lanes",
        items: [],
        groups: [
          {
            title: "League of Legends",
            preview_id: "1770304077",
            pics: {
              thumb: "",
              big: "",
            },
            layout: "lanes",
            items: [],
            groups: [
              {
                title: "En directo",
                preview_id: "leave",
                pics: {
                  thumb: "",
                  big: "",
                },
                items: leaguesWithStreams,
              },
              {
                title: "Equipos",
                preview_id: "teams",
                pics: {
                  thumb: "",
                  big: "",
                },
                items: teamsWithStreams,
              },
            ],
          },
        ],
      },
    ],
  });
});

export default router;
