
class Service {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

class addNewGroupCtrl {
  constructor($modal, $modalInstance) {
    'ngInject';
    this.submit = $modalInstance.close; // passed parameter for then
    this.close = function () {
      $modalInstance.close();
    };
  }
}

class MainController extends Service {
  constructor($modal, localStorage) {
    'ngInject';
    super();
    // let instance;
    this.title = 'Phone Book Groups';
    this.list = localStorage.getPhoneBook();

    this.capitalizeFirstLetter = super.capitalizeFirstLetter;

    this.addNewGroup = function () {
      const modalInstance = $modal.open({
        template: '<div class="modal-header">Add New Group</div>' +
          '<div class="modal-body"><input class="form-control" type="text" ng-model="$ctrl.model" placeholder="Enter group name"></div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-primary" ng-disabled="!$ctrl.model" ng-click="$ctrl.submit($ctrl.model)">Submit</button>' +
          '<button class="btn btn-primary" ng-click="$ctrl.close()">Cancel</button>' +
        '</div>',
        controller: addNewGroupCtrl,
        bindToController: true,
        controllerAs: '$ctrl'
      });

      modalInstance.result.then(newGroupName => {
        if (!newGroupName) {
          return;
        }
        this.list[newGroupName] = [];
      });
    };

    localStorage.goToFirstGroup();
  }
}

export const App = {
  template: require('./App.html'),
  controller: MainController
};
