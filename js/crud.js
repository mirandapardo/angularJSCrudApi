var app = angular.module("mainApp", []);
  app.controller('CRUDController', function ($scope, $http) {
    limpiarEmpleadoActivo();

    $http.get("http://mirandapardo.com/conectterEmployeeData.json")
    .then(function(response) {
    $scope.empList = response.data
    });
      //$scope.empList = [{"id":0,"nombre":"Ricardo Miranda","edad":28,"mail":"ricardo@conectter.com","cargo":"Front End Developer"},{"id":1,"nombre":"Guillermo Briceño","edad":28,"mail":"guillermo@conectter.com","cargo":"Back End Developer"},{"id":2,"nombre":"Andrés Sanhueza","edad":28,"mail":"andres@conectter.com","cargo":"Front End Developer"},{"id":3,"nombre":"Felipe Vergara","edad":28,"mail":"felipe@conectter.com","cargo":"Senior consultant"},{"id":4,"nombre":"Javier Torres","edad":28,"mail":"javier@conectter.com","cargo":"Co-Founder"},{"id":5,"nombre":"Cristián Torres","edad":28,"mail":"cristian@conectter.com","cargo":"Co-Founder"},{"id":6,"nombre":"Sergio Bustamante","edad":28,"mail":"sergio@conectter.com","cargo":"Back End Developer"},{"id":7,"nombre":"Claudio Venegas","edad":28,"mail":"claudio@conectter.com","cargo":"Dirección estratégica y comercial"}];
    $scope.abrirModal = function (tipo, id) {
     limpiarEmpleadoActivo()
     $scope.edit = false;
     switch (tipo) {
       case 'delete':
         $scope.modalDelete = true;
         $scope.empleado = $scope.empList.find(emp => emp.id === id);
         break;
       case 'agregar':
         $scope.modalAgregar = true;
         break;
       case 'editar':
         $scope.modalAgregar = true;
         $scope.edit = true;
         angular.copy( $scope.empList.find(emp => emp.id === id), $scope.empleado );
         break;
       default:
     }
    }

    $scope.agregarTrabajador = function () {
      $scope.empList.push($scope.empleado);
      $scope.modalAgregar = false;
    }

    $scope.editarTrabajador = function () {
      let indexEdit = $scope.empList.findIndex(emp => emp.id === $scope.empleado.id)
      $scope.empList[indexEdit] = $scope.empleado
      $scope.modalAgregar = false;
      // $http.put("web", datosTrabajador).then(response){}
    }

    $scope.eliminarTrabajador = function () {
      let indexDelete = $scope.empList.findIndex(emp => emp.id === $scope.empleado.id)
      $scope.empList.splice(indexDelete, 1)
      // $http.delete("web", datosTrabajador).then(response){}
    }

     function limpiarEmpleadoActivo() {
         $scope.empleado = {
          id: '',
          nombre: '',
          edad: '',
          mail: '',
          cargo: ''
         };
       }
   });
