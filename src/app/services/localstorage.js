export default class LocalStorage {
  constructor($state, $localStorage) {
    'ngInject';
    // this.$localStorage = $localStorage;
    this.$state = $state;
    this.phoneBook = $localStorage.phoneBook || ($localStorage.phoneBook = {
      friends: [
        {name: 'Tal Priel', id: 1, phone: '0546552656'},
        {name: 'Aviv Hadar', id: 3, phone: '0546552636'}
      ],
      work: [{name: 'Fred Z', id: 2, phone: '054632133'}],
      sluts: [
        {name: 'lena', phone: '0546015289'}
      ]
    });
  }

  getPhoneBook() {
    return this.phoneBook;
  }

  getPhonesByGroup(group) {
    return this.phoneBook[group];
  }

  deleteGroup(group) {
    delete this.phoneBook[group];
    const keys = Object.keys(this.phoneBook);
    if (keys.length) {
      this.goToFirstGroup();
    } else {
      this.goToMainState();
    }
  }

  deleteItem(index, group) {
    this.phoneBook[group].splice(index, 1);
  }

  goToMainState() {
    this.$state.go('app');
  }

  goToFirstGroup() {
    this.$state.go('app.group', {groupName: Object.keys(this.phoneBook)[0]});
  }
}
