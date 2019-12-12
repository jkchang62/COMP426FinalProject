import Autosuggest from 'react-autosuggest';
import firebase from 'firebase';
import React from 'react';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'Cantebury',
    year: 1972
  },
  {
    name: 'Castle Blanca',
    year: 2012
  },
  {
    name: 'Elizabeth',
    year: 2012
  },
  {
    name: 'Automplete',
    year: 2012
  },
  {
    name: 'Ellinia',
    year: 2012
  },
  {
    name: 'Elijah',
    year: 2012
  },
  {
    name: 'Entemology',
    year: 2012
  },
];
 
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, arr) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
 
  return inputLength === 0 ? [] : arr.filter(lang =>
    lang.toLowerCase().slice(0, inputLength) === inputValue
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
      urlArr: []
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
      suggestions: getSuggestions(value, this.state.allImages)
    });
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
    let allImages = [];
    let tempImage = {};
    let urlArr = [];
    let numImages = 50;

    for(let i = 0; i < numImages; i++) {
        var tempQuery = imageRef.where("randomIndex", "==", i);
        tempQuery.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              tempImage = doc.data().title;
              urlArr.push(doc.data().url);
            })
        }).then(() => {
            allImages.push(tempImage);
            this.setState({
                allImages : allImages,
                urlArr : urlArr
            });
        }).then(() => {
            // console.log(this.state.allImages);
            // console.log(this.state.urlArr);
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

    console.log(suggestions);

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}