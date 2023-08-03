import useEmblaCarousel from "embla-carousel-react";
import EventCard, { EventCardData } from "./EventCard";

type Props = {
  events: EventCardData[];
};

const EventCarousel = ({ events }: Props) => {
  const [emblaRef] = useEmblaCarousel();
  return (
    <div className="embla w-full" ref={emblaRef}>
      <div className="embla__container">
        {events.map((event, index) => {
          return (
            <div className="embla__slide" key={`event__slide--${index}`}>
              <EventCard
                thumbnail={event.thumbnail}
                title={event.title}
                description={event.description}
                time={event.time}
                link={event.link}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCarousel;
