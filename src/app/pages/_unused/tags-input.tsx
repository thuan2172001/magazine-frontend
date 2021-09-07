import React from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import './style.css';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

// const key = AuthCryptography.GenerateKeyPair();
// console.log(key.privateKey);
// console.log('fffff====>', key.publicKey);
// console.log('signed mess ===>', AuthCryptography.SignMessage(key.privateKey, 'sadsad'));

// console.log(
//   'Verify =>>>',
//   AuthCryptography.VerifyMessage(key.publicKey, 'sadsad', AuthCryptography.SignMessage(key.privateKey, 'sadsad')),
// );

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      tags: [
        {id: 'Thailand', text: 'Thailand'},
        {id: 'India', text: 'India'},
      ],
      suggestions: [
        {id: 'USA', text: 'USA'},
        {id: 'Germany', text: 'Germany'},
        {id: 'Austria', text: 'Austria'},
        {id: 'Costa Rica', text: 'Costa Rica'},
        {id: 'Sri Lanka', text: 'Sri Lanka'},
        {id: 'Thailand', text: 'Thailand'},
      ],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }
  
  handleDelete(i: number) {
    const {tags}: any = this.state;
    this.setState({
      tags: tags.filter((tag: any, index: number) => index !== i),
    });
  }
  
  handleAddition(tag: any) {
    this.setState((state: any) => ({tags: [...state.tags, tag]}));
  }
  
  handleDrag(tag: any, currPos: number, newPos: number) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();
    
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    
    // re-render
    this.setState({tags: newTags});
  }
  
  render() {
    const {tags, suggestions} = this.state;
    return (
      <div id="tag">
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          delimiters={delimiters}
        />
      </div>
    );
  }
}

export default App;
