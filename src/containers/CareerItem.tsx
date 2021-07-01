import { CareerSummary } from '../reducers/reducerCareers';
import SideBarItem from './SideBarItem';
import { gaCareerSelected } from '../helpers/googleAnalytics';

type Props = { career: CareerSummary };

const CareerItem = ({ career }: Props) => {
  const clickItem = () => {
    // Send event to Google Analytics
    gaCareerSelected(career.name, career.class, career.race);
  };

  const url = `/career/${career.slug}`;
  const imgUrl = `../images/icons/${career.slug}.png`;

  return (
    <SideBarItem
      url={url}
      img={imgUrl}
      text={career.name}
      onClick={clickItem}
    />
  );
};

export default CareerItem;
