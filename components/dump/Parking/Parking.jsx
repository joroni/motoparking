var React = require("react/addons");

var Router = require("react-router");
var Link = Router.Link;

var StatusCover = require("./StatusCover/StatusCover");
var MyOpinion = require("../../MyOpinion");
var Icon = require("../Icon/Icon");
var Comments = require("../../Comments");
var SliderWithFileUploader = require("./SliderWithFileUploader/SliderWithFileUploader");
var Sidebar = require("../Sidebar/Sidebar");
var AvatarList = require("../AvatarList/AvatarList");
var Prices = require("./Prices/Prices");

require("./Parking.css");


var Parking = React.createClass({
  propTypes: {
    loading: React.PropTypes.bool,
    error: React.PropTypes.bool,
    currentParking: React.PropTypes.object.isRequired,
    currentParkingOpinions: React.PropTypes.array.isRequired,
    parkingImages: React.PropTypes.array,
    comments: React.PropTypes.array.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    currentUserIsAuthorized: React.PropTypes.bool,
    onEditLocation: React.PropTypes.func.isRequired,
    onDeleteParking: React.PropTypes.func.isRequired,
    onSlideParkingImage: React.PropTypes.func.isRequired,
    onAuthorizationRequired: React.PropTypes.func.isRequired,
    onPostParkingImage: React.PropTypes.func.isRequired,
    cloudinaryConfig: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <Sidebar>
        { this.props.currentUser.isSuper ? (
          <a href="#" style={ {color: "#FFF"} } onClick={ this.props.onDeleteParking }>
            <div className="close-wrapper" style={{right: "inherit", left: 6}}>
              <Icon name="delete" />
            </div>
          </a>
        ) : null }

        <Link to="Default" style={ {color: "#FFF"} }>
          <div className="close-wrapper">
            <Icon name="close" />
          </div>
        </Link>

        <StatusCover
          isSecure={ this.props.currentParking.isSecure }
          isMoto={ this.props.currentParking.isMoto }/>

        { this.props.currentParking.isFullParkingLoaded ? (
          <div>
            <AvatarList users={ this.props.currentParking.users } />

            { this.props.currentParking.isMoto === "yes" ?
              <Prices
                pricePerDay={ this.props.currentParking.pricePerDay }
                pricePerMonth={ this.props.currentParking.pricePerMonth } /> : null }

            <SliderWithFileUploader
              parkingImages={ this.props.parkingImages }
              onSlideParkingImage={ this.props.onSlideParkingImage }
              onAuthorizationRequired={ this.props.onAuthorizationRequired }
              currentUserIsAuthorized={ this.props.currentUserIsAuthorized }
              onPostParkingImage={ this.props.onPostParkingImage }
              currentParkingId={ this.props.currentParking.id }
              cloudinaryConfig={ this.props.cloudinaryConfig }/>

            <div className="InfoRow">
              <div className="Address">{ this.props.currentParking.address }&nbsp;</div>
              { this.props.currentUser && this.props.currentUser.id === this.props.currentParking.user ?
                <Icon name="edit" additionalClasses={ ["edit-location-button"] } onClick={ this.props.onEditLocation }/> :
                null }
            </div>

            <MyOpinion
              parking={ this.props.currentParking }
              currentUserIsAuthorized={ this.props.currentUserIsAuthorized }
              actions={ this.props.actions }/>

            <Comments comments={ this.props.comments } />
          </div>
        ) : <div className="loading">Loading...</div> }
      </Sidebar>
    );
  }
});

module.exports = Parking;
