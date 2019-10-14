import React from 'react';
import { Route } from 'react-router-dom';
import AddImageForm from './AddImageForm';
import CardList from './CardList';
import ImageTabNavBar from './ImageTabNavBar';
import ImageDetail from './ImageDetail';
import PropTypes from 'prop-types';

function Container(props) {
  return (
    <div className="ui center aligned container" style={{margin: '30px auto',}}>
      <Route path='/images/:imageName' render={({ match }) => (
        <ImageDetail
          image={ props.images.filter(
            image => image.name === `${match.params.imageName}.jpg`
          )}
        />
      )} />
      <Route exact path='/images' render={() => (
        <div className="ui center aligned three column stackable grid">
          <div className="row">
            { props.isAuthenticated && (
              <AddImageForm
                onButtonClick={ props.onButtonClick }
              />
            )}
          </div>
          <div className="row">
            <ImageTabNavBar
              selectedTab={ props.selectedTab }
              onTabChange={ props.onTabChange }
            />
          </div>
          <CardList
            images={ props.images }
            isLoading={ props.isLoading }
            currentUser={ props.currentUser }
            selectedTab={ props.selectedTab }
            onDeleteImage={ props.onDeleteImage }
          />
        </div>
      )} />
    </div>
  );
}

Container.propTypes = {
  images: PropTypes.array.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onDeleteImage: PropTypes.func.isRequired
};

export default Container;