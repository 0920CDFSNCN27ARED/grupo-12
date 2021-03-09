import React from 'react';
import Header from './components/header/Header';
import SideMenu from './components/side-menu/SideMenu';
import DataCardSmall from './components/cards/data-card-small/DataCardSmall'
import DataCard from './components/cards/data-card/DataCard';

function App() {

  const smallCardData = [
    {
      id: 1,
      title: 'Titulo 1',
      value: 123,
      icon: 'fa-clipboard-list'
    },
    {
      id: 2,
      title: 'Titulo 2',
      color: 'danger',
      value: 679.45,
      icon: 'fa-clipboard-list'
    },
    {
      id: 3,
      title: 'Titulo 3',
      color: 'warning',
      value: 456,
      icon: 'fa-clipboard-list'
    },
  ]

  return (
    <div id="wrapper">
      <SideMenu />
		  <div id="content-wrapper" className="d-flex flex-column">
			  <div id="content">
          <Header />
          <div className="container-fluid">

            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
            </div>

            <div className="row">
              {
                smallCardData.map((element) => {
                  return (
                    <DataCardSmall
                      key={element.id} 
                      title={element.title}
                      color={element.color}
                      value={element.value}
                      icon={element.icon}
                    />
                  )
                })
              }
              
            </div>

            <div className="row">
              <DataCard />
              <DataCard />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
