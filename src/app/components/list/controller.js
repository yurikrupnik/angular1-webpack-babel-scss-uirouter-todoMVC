import _ from 'lodash';

class addNewContactCtrl {
  constructor($modalInstance, form, title) {
    'ngInject';
    this.form = form;
    this.title = title;
    this.submit = $modalInstance.close; // passed parameter for then
    this.close = function () {
      $modalInstance.close();
    };

    this.isFormDisabled = function (form) {
      return !_.every(form, v => v);
    };
  }
}
export default class ListController {
  constructor($stateParams, localStorage, $modal) {
    'ngInject';
    this.title = 'Contacts';
    this.list = localStorage.getPhonesByGroup($stateParams.groupName);

    this.deleteGroup = function () {
      localStorage.deleteGroup($stateParams.groupName);
    };

    this.delete = function (i) {
      localStorage.deleteItem(i, $stateParams.groupName);
    };

    this.handleContact = function (item, index) { // index passed with item
      const title = item ? 'Edit' : 'New';
      const modalInstance = $modal.open({
        template: '<div class="modal-header">{{$ctrl.title}} Contact</div>' +
        '<div class="modal-body">' +
        '<input class="form-control" type="text" ng-model="$ctrl.form.name" placeholder="Name"><br/>' +
        '<input class="form-control" type="phone" ng-model="$ctrl.form.phone" placeholder="Phone Number">' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button class="btn btn-primary" ng-disabled="$ctrl.isFormDisabled($ctrl.form)" ng-click="$ctrl.submit($ctrl.form)">Submit</button>' +
        '<button class="btn btn-primary" ng-click="$ctrl.close()">Cancel</button>' +
        '</div>',
        controller: addNewContactCtrl,
        bindToController: true,
        controllerAs: '$ctrl',
        resolve: {
          form() {
            return item ? _.cloneDeep(item) : {
              name: '',
              phone: ''
            };
          },
          title() {
            return title;
          }
        }
      });

      modalInstance.result.then(newContact => {
        if (!newContact) {
          return;
        }
        if (title === 'New') {
          this.list.push(newContact);
        } else {
          this.list[index] = newContact;
        }
      });
    };
  }
}
