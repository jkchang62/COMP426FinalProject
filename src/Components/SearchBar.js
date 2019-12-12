import Autosuggest from 'react-autosuggest';
import firebase from 'firebase';
import React from 'react';
import '../View/SearchPicture.css';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, arr) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : arr.filter(lang =>
    lang.titles.toLowerCase().slice(0, inputLength) === inputValue
  );
};
 
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;
 
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);
 
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
 
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      pictures: [], 
      allImages: null,
      info: []
    };
  }
 
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
 
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.state.info)
    });
    
    let urlArr = []
    this.state.suggestions.filter(picture => {
        urlArr.push(
            <div className = "picture">
                <img src = {picture.url} /> 
            </div>
        )
    })
    this.props.renderNewPicture(urlArr);
  };
 
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentWillMount() {
    var db = firebase.firestore();
    var imageRef = db.collection("images");
    let info = [];
    let numImages = 50;

    for(let i = 0; i < numImages; i++) {
        var tempQuery = imageRef.where("randomIndex", "==", i);
        tempQuery.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              let tempInfo = {
                  url: doc.data().url,
                  titles: doc.data().title
              }
              info.push(tempInfo);
            })
        }).then(() => {
            this.setState({
                info : info
            });
        }).then(() => {
            console.log(this.state.info);
        });
    }
  }
 
  render() {
    const { value, suggestions } = this.state;
 
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a painting you wish to see...',
      value,
          onChange: this.onChange
      };

    let titleArr = [];
    suggestions.filter(picture => {
        titleArr.push(<li> {picture.titles} </li>);
    })

    console.log(titleArr);
    console.log(suggestions);

    // Finally, render it!
    return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />

      <div>
          <ol>
          {titleArr}
          </ol>
      </div>
      </div>

    );
  }
}