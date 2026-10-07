const RoRHeader = () => (
  <nav className="navbar ror-builder-navbar" aria-label="Main navigation">
    <div className="navbar-brand">
      <a className="navbar-item ror-builder-brand" href="/">
        RoR Build Planner
      </a>
    </div>
    <div className="navbar-menu is-active">
      <div className="navbar-start">
        <a className="navbar-item" href="/">
          Build Planner
        </a>
        <a className="navbar-item" href="/mastery">
          Mastery Builder
        </a>
      </div>
      <div className="navbar-end">
        <a className="navbar-item" href="https://www.returnofreckoning.com/">
          Return of Reckoning
        </a>
        <a
          className="navbar-item"
          href="https://killboard.returnofreckoning.com/"
        >
          Killboard
        </a>
      </div>
    </div>
  </nav>
);

export default RoRHeader;
