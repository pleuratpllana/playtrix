import { useState } from "react";
import Section from "../components/shared/Section";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChartBarIcon,
  MusicalNoteIcon,
  UserCircleIcon,
  StarIcon,
  ClockIcon,
  CheckBadgeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/shared/UI/Button";

const MyAccount = () => {
  const [profilePic, setProfilePic] = useState(
    "https://www.gravatar.com/avatar/?s=200&d=mp&r=pg"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("Pleurat Pllana");
  const [emailAddress, setEmailAddress] = useState("info@the-p-squared.com");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  const smallBoxData = [
    {
      id: "1",
      title: "Most Played",
      content: "Leviathan",
      icon: <MusicalNoteIcon className="h-8 w-8 mb-1 text-green-600" />,
    },
    {
      id: "2",
      title: "Favorite Artist",
      content: "Volbeat",
      icon: <UserCircleIcon className="h-8 w-8 mb-1 text-green-600" />,
    },
    {
      id: "3",
      title: "Favorite Genre",
      content: "Rock/Metal",
      icon: <StarIcon className="h-8 w-8 mb-1 text-green-600" />,
    },
    {
      id: "4",
      title: "Total Streams",
      content: "1,234,948",
      icon: <ChartBarIcon className="h-8 w-8 mb-1 text-green-600" />,
    },
  ];

  const extraBoxData = [
    {
      id: "5",
      title: "Current Plan",
      content: "Premium Member",
      icon: <CheckBadgeIcon className="h-8 w-8 mb-1 text-green-600" />,
    },
    {
      id: "6",
      title: "Top Album",
      content: "Rewind, Replay, Rebound",
      icon: <ChartBarIcon className="h-8 w-8 mb-1 text-green-600" />,
    },
    {
      id: "7",
      title: "New Genre",
      content: "Synthwave",
      icon: <StarIcon className="h-8 w-8 mb-1 text-green-600" />,
    },
    {
      id: "8",
      title: "Minutes Played",
      content: "13,200",
      icon: <ClockIcon className="h-8 w-8 mb-1 text-green-600" />,
    },
  ];

  const songs = [
    { title: "Leviathan", artist: "Volbeat", album: "Rewind, Replay, Rebound" },
    { title: "Echoes", artist: "Pink Floyd", album: "Meddle" },
    { title: "Highway to Hell", artist: "AC/DC", album: "Highway to Hell" },
  ];

  const handleNextSong = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSongIndex((prevIndex) =>
        prevIndex === songs.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const handlePreviousSong = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSongIndex((prevIndex) =>
        prevIndex === 0 ? songs.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <Section
      title="My Account"
      description="This section displays your activity on the platform"
      showSearch={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-1.5">
        {/* Left Profile Info Box */}
        <div className="col-span-1 flex flex-col justify-between">
          <h4 className="mb-2">Account Info</h4>
          <div className="relative flex flex-col rounded-lg h-[420px] bg-[rgba(255,255,255,0.1)] border border-white/10 shadow-md shadow-white/5 overflow-hidden items-center justify-center">
            <p className="absolute top-3 right-3 text-xs text-white/80">
              Last login &nbsp;:&nbsp; 2 hours ago
            </p>
            <div className="relative">
              <img
                src={profilePic}
                alt="Profile"
                className="mb-2 border rounded-full border-green-600 h-32 w-32 object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profilePicInput"
              />
              <label
                htmlFor="profilePicInput"
                className="absolute -top-1 right-2 bg-green-600 p-1.5 rounded-full cursor-pointer hover:bg-gray-200 transition duration-200"
              >
                <PencilIcon className="h-5 w-5 text-white hover:text-black transition duration-200" />
              </label>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              {isEditing ? (
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-sm font-md text-white p-3 bg-transparent border border-white/80 rounded-full focus:border-green-500 transition-colors duration-200 outline-none"
                />
              ) : (
                <p className="text-md font-normal text-white/80">
                  Username:
                  <span className="font-bold text-white"> {username}</span>
                </p>
              )}
              {isEditing ? (
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-sm font-md text-white p-3 bg-transparent border border-white/80 rounded-full focus:border-green-500 transition-colors duration-200 outline-none"
                  placeholder="Enter your email"
                />
              ) : (
                <p className="text-md font-normal text-white/80  pb-1.5">
                  Email:
                  <span className="font-bold text-white"> {emailAddress}</span>
                </p>
              )}
              <Button
                text={isEditing ? "Save" : "Edit Info"}
                onClick={handleEditToggle}
                additionalClasses="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Middle Boxes */}
        <div className="col-span-1 grid grid-cols-2 gap-6">
          {smallBoxData.map((box) => (
            <div key={box.id} className="flex flex-col items-center">
              <h4 className="mb-2 text-left w-full">{box.title}</h4>
              <div className="relative flex flex-col items-center rounded-lg h-[180px] w-full bg-[rgba(255,255,255,0.1)] border border-white/10 shadow-md shadow-white/5 overflow-hidden justify-center">
                {box.icon && <div>{box.icon}</div>}
                <p className="text-md font-semibold">{box.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel for Most Played Songs */}
        <div className="col-span-1 flex flex-col justify-between">
          <h4 className="mb-2 text-left">Most Played Songs</h4>
          <div className="relative flex flex-col rounded-lg h-[420px] bg-[rgba(255,255,255,0.1)] border border-white/10 shadow-md shadow-white/5 overflow-hidden items-center justify-center">
            <button
              onClick={handlePreviousSong}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 transition duration-300 group"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white transition duration-300 group-hover:text-green-600" />
            </button>

            <div
              className={`text-center transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <h2 className="text-lg font-semibold text-white">
                {songs[currentSongIndex].title}
              </h2>
              <p className="text-sm text-white/80 mt-1">
                <span className="font-medium">Artist:</span>{" "}
                {songs[currentSongIndex].artist}
              </p>
              <p className="text-sm text-white/80">
                <span className="font-medium">Album:</span>{" "}
                {songs[currentSongIndex].album}
              </p>
            </div>

            <button
              onClick={handleNextSong}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 transition duration-300 group"
            >
              <ChevronRightIcon className="h-6 w-6 text-white transition duration-300 group-hover:text-green-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Extra Row for Additional Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {extraBoxData.map((box) => (
          <div key={box.id} className="flex flex-col items-center">
            <h4 className="mb-2 text-left w-full">{box.title}</h4>
            <div className="relative flex flex-col items-center rounded-lg h-[180px] w-full bg-[rgba(255,255,255,0.1)] border border-white/10 shadow-md shadow-white/5 overflow-hidden justify-center">
              {box.icon && <div>{box.icon}</div>}
              <p className="text-md font-semibold">{box.content}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default MyAccount;
