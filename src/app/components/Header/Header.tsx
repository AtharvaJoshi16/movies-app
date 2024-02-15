"use client";
import { Button } from "@/components/ui/button";
import "./Header.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Choice, tabContext } from "@/app/tabContext";
import axios from "axios";

interface GenresProps {
  genres: Genre[];
}

interface Genre {
  id: number;
  name: string;
}

async function getGenres(choice: Choice) {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/genre${
        choice === "tv" ? "/tv/" : "/"
      }list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    .then((resp) => resp.data);
  return res;
}

export const Header = () => {
  const router = useRouter();
  const [inputValue, setValue] = useState("");
  const { choice, setTabChoice } = useContext(tabContext);
  const [genres, setGenres] = useState<Genre[]>([]);
  useEffect(() => {
    async function setAllGenres() {
      const genres = await getGenres(choice);
      setGenres(genres?.genres);
    }
    setAllGenres();
  }, [choice]);

  const components = [
    {
      id: 1,
      title: "Now Playing",
      href: "/now_playing",
    },
    {
      id: 2,
      title: "Popular",
      href: "/",
    },
    {
      id: 3,
      title: "Top Rated",
      href: "/top_rated",
    },
    {
      id: 4,
      title: "Upcoming",
      href: "/upcoming",
    },
  ];

  const tvComponents = [
    {
      id: 1,
      title: "Airing Today",
      href: "/airing_today",
    },
    {
      id: 2,
      title: "Popular",
      href: "/",
    },
    {
      id: 3,
      title: "Top Rated",
      href: "/top_rated",
    },
    {
      id: 4,
      title: "On The Air",
      href: "/on_the_air",
    },
  ];

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.currentTarget.value &&
        router.push(`/search?q=${e.currentTarget.value}`);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    inputValue && router.push(`/search?q=${inputValue}`);
  };
  return (
    <div className="header flex items-center p-[20px] m-0 gap-[20px]">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Types</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="gap-3 p-4 md:w-[200px]">
                {(choice === "movie" ? components : tvComponents)?.map(
                  (item) => (
                    <ListItem {...item} />
                  )
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Genres genres={genres} />
      <Tabs className="ml-[30px]" defaultValue="movie">
        <TabsList>
          <TabsTrigger onClick={() => setTabChoice("movie")} value="movie">
            Movies
          </TabsTrigger>
          <TabsTrigger onClick={() => setTabChoice("tv")} value="tv">
            TV Shows
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex items-center ml-[100px] gap-[10px]">
        <Input
          onChange={(e) => handleInput(e)}
          onKeyDown={(e) => handlePressEnter(e)}
          className="w-[400px]"
          placeholder="Search for a movie, tv series or a keyword..."
        />
        <Button onClick={handleClick} size="icon" variant="outline">
          <Search width={17} height={17} />
        </Button>
      </div>
    </div>
  );
};

const ListItem = ({
  title,
  href,
  id,
}: {
  title?: string;
  href: string;
  id: number;
}) => {
  return (
    <li key={`${title}-${id}`}>
      <Link
        href={href}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <NavigationMenuLink asChild>
          <p>{title}</p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
};

const Genres = ({ genres }: GenresProps) => {
  const router = useRouter();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => router.push("/genre")}>
            Genres
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 p-4 w-[500px] grid grid-cols-3">
              {genres?.map((item) => (
                <li className="row-span-3" key={`${item?.name}-${item?.id}`}>
                  <Link
                    href={`/genre/${item.name}-${item.id}`}
                    className="block text-sm select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <p>{item?.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
