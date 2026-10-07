import { Loadout } from './loadout/Loadout';

const UnifiedPlanner = ({ mastery = false }: { mastery?: boolean }) => (
  <div className="container is-max-widescreen planner-page">
    <div className="planner-heading">
      <h1 className="title">Return of Reckoning Build Planner</h1>
      <p className="subtitle is-6">
        Plan and share gear, renown abilities, mastery paths, tactics, and
        morales as one complete build.
      </p>
    </div>
    <Loadout initialTab={mastery ? 'mastery' : undefined} />
  </div>
);

export default UnifiedPlanner;
