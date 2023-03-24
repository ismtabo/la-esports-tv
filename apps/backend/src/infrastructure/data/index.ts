export type Item = {
  title: string;
  twitch_id: string;
  type: "stream" | "video";
  pics: {
    thumb: string;
    big: string;
  };
};

export type Group = {
  title: string;
  preview_id?: string;
  pics: {
    thumb: string;
    big: string;
  };
  layout: "root" | "lanes";
  items?: Item[];
  groups?: Group[];
};

export const DATA: Group = {
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
              title: "LVP ES",
              preview_id: "lvpes",
              pics: {
                thumb: "",
                big: "",
              },
              layout: "lanes",
              items: [
                {
                  title: "LVP ES",
                  twitch_id: "lvpes",
                  type: "stream",
                  pics: {
                    thumb: "",
                    big: "",
                  },
                },
                {
                  title: "Movistar Riders",
                  twitch_id: "movistar_riders",
                  type: "stream",
                  pics: {
                    thumb: "",
                    big: "",
                  },
                },
                {
                  title: "Fnatic",
                  twitch_id: "fnatic",
                  type: "stream",
                  pics: {
                    thumb: "",
                    big: "",
                  },
                },
              ],
              groups: [],
            },
            {
              title: "LVP ES",
              preview_id: "lvpes",
              pics: {
                thumb: "",
                big: "",
              },
              layout: "lanes",
              items: [
                {
                  title: "LVP ES",
                  twitch_id: "lvpes",
                  type: "stream",
                  pics: {
                    thumb: "",
                    big: "",
                  },
                },
                {
                  title: "Movistar Riders",
                  twitch_id: "movistar_riders",
                  type: "stream",
                  pics: {
                    thumb: "",
                    big: "",
                  },
                },
                {
                  title: "Fnatic",
                  twitch_id: "fnatic",
                  type: "stream",
                  pics: {
                    thumb: "",
                    big: "",
                  },
                },
              ],
              groups: [],
            },
          ],
        },
        {
          title: "Valorant",
          preview_id: "1770304077",
          pics: {
            thumb: "",
            big: "",
          },
          layout: "lanes",
          items: [],
          groups: [
            {
              title: "LVP ES",
              preview_id: "lvpes",
              pics: {
                thumb: "",
                big: "",
              },
              layout: "lanes",
              items: [
                {
                  title: "LVP ES",
                  twitch_id: "lvpes",
                  type: "stream",
                  pics: {
                    thumb: "",
                    big: "",
                  },
                },
                {
                  title: "Movistar Riders",
                  twitch_id: "movistar_riders",
                  type: "stream",
                  pics: {
                    thumb: "",
                    big: "",
                  },
                },
                {
                  title: "Fnatic",
                  twitch_id: "fnatic",
                  type: "stream",
                  pics: {
                    thumb: "",
                    big: "",
                  },
                },
              ],
              groups: [],
            },
          ],
        },
      ],
    },
    {
      title: "Creative",
      preview_id: "1770304077",
      pics: {
        thumb: "",
        big: "",
      },
      layout: "root",
      groups: [
        {
          title: "Drawing",
          preview_id: "1770304077",
          pics: {
            thumb: "",
            big: "",
          },
          layout: "lanes",
          items: [
            {
              title: "Salva Espin",
              twitch_id: "salvaespin",
              type: "stream",
              pics: {
                thumb: "",
                big: "",
              },
            },
            {
              title: "IvartTwitch",
              twitch_id: "ivarttwitch",
              type: "stream",
              pics: {
                thumb: "",
                big: "",
              },
            },
          ],
        },
        {
          title: "Makers",
          preview_id: "1770806415",
          pics: {
            thumb: "",
            big: "",
          },
          layout: "lanes",
          items: [
            {
              title: "Kiki Crafted",
              twitch_id: "kikicrafted",
              type: "stream",
              pics: {
                thumb: "",
                big: "",
              },
            },
            {
              title: "PaulPapeDesigns",
              twitch_id: "paulpapedesigns",
              type: "stream",
              pics: {
                thumb: "",
                big: "",
              },
            },
          ],
        },
      ],
    },
  ],
};
