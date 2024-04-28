import { useEffect, useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModal = (item) => {
    setSelectedItem(item);
    setShowModal(!showModal);
  };

  const [endPoint, setendPoint] = useState("");
  const [container, setcontainer] = useState([]);
  const [finalPoint, setfinalPoint] = useState("");

  useEffect(() => {
    fetchme();
  }, [finalPoint]);

  const fetchme = () => {
    fetch(
      `https://anime-db.p.rapidapi.com/anime?page=1&size=20&search=${endPoint}&sortBy=title&sortOrder=asc`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "Your anime-db api key",
            "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setcontainer(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onsubmithandler = (e) => {
    setendPoint(e.target.value);
  };

  const submithandler = (e) => {
    e.preventDefault();
    setfinalPoint(endPoint);
  };

  return (
    <div className="bg-slate-800 text-white p-8">
      <div className="flex justify-center text-5xl font-semibold tracking-normal p-3">
        <h1>Anime Finder</h1>
      </div>

      <div className="flex justify-center p-4">
        <form onSubmit={submithandler}>
          <input
            className="bg-white text-slate-800 w-[250px] h-[40px] placeholder-slate-800 rounded-md p-2 border-none "
            type="text"
            placeholder="Anime Name"
            value={endPoint}
            onChange={onsubmithandler}
          />
          <button
            className="bg-white text-slate-800 ml-6 w-[120px] h-[40px] rounded-md"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-4 gap-8 bg-slate-800 mt-8">
        {container.map((item, index) => (
          <div
            key={index}
            className="p-1 border rounded-lg bg-gray-100 text-center"
          >
            <div className="flex justify-center items-center">
              <img
                src={item.image}
                className="h-[300px] mb-2 border-8 rounded-lg"
                alt="anime"
              />
            </div>
            <p className="text-slate-800 font-semibold text-xl w-full">
              {item.title}
            </p>
            <h1 className="text-slate-800 text-xl">Plot</h1>
            <div className="max-h-[6em] overflow-hidden">
              <p className="text-slate-800">{item.synopsis}</p>
            </div>
            <button
              className="text-blue-700 hover:underline mt-2"
              onClick={() => toggleModal(item)}
            >
              Show More
            </button>
          </div>
        ))}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded shadow-lg w-3/4">
              <h1 className="text-slate-800 text-2xl font-semibold mb-4">
                {selectedItem.title}
              </h1>
              <h2 className="text-slate-800 text-xl font-semibold mb-2">
                Plot
              </h2>
              <p className="text-slate-800 mb-4">{selectedItem.synopsis}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => toggleModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
