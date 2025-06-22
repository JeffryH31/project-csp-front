import CinemaCard from "./CinemaCard";

const CinemaCardGrid = ({ items }) => {
  return (
    <div className="w-full grid md:grid-cols-2 gap-4 md:gap-6 md:items-start">
      {items.map((item, index) => (
        <CinemaCard key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default CinemaCardGrid;