import Link from 'next/link';
import './MapBar.css';

const MapBar = () => {
  return (
    <div className="map-bar">
      <nav>
        <ul className="map-list">
          <li><Link href="/?map=1"><button>Anubis</button></Link></li>
          <li><Link href="/?map=2"><button>Ancient</button></Link></li>
          <li><Link href="/?map=3"><button>Dust</button></Link></li>
          <li><Link href="/?map=4"><button>Inferno</button></Link></li>
          <li><Link href="/?map=5"><button>Mirage</button></Link></li>
          <li><Link href="/?map=6"><button>Nuke</button></Link></li>
          <li><Link href="/?map=7"><button>Vertigo</button></Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MapBar;

