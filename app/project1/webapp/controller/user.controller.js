
sap.ui.define(
  [
    "./Basecontroller",
    // "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
  ],
  function (Controller, MessageToast, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("com.app.project1.controller.user", {
      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.attachRoutePatternMatched(this.onUserDetailsLoad, this);


        const newBorrowModel = new JSONModel({
          author: "",
          title: "",
          ISBN: "",
          DueDate: ""
        });

      },

      onUserDetailsLoad: function (oEvent) {
        const { id } = oEvent.getParameter("arguments");
        this.ID = id;
        // const sRouterName = oEvent.getParameter("name");
        const oObjectPage = this.getView().byId("ObjectPageLayout");

        oObjectPage.bindElement(`/users(${id})`);
      },
      // onBorrowNewBookPress: async function () {
      //   debugger
      //   var oSelected = this.byId("idBooksTable").getSelectedItem();
      //   if (oSelected) {

      //     var oID = oSelected.getBindingContext().getProperty("ID")
      //     var ouser_ID = oSelected.getBindingContext().getProperty("user_ID")
      //     var obook_ID = oSelected.getBindingContext().getProperty("book_ID")
      //     var oreservationDate = oSelected.getBindingContext().getProperty("reservationDate");
      //     var newBorrowModel = new JSONModel();
      //     newBorrowModel.setData(

      //       {
      //         "selectedReservations": [
      //           {

      //             selectedId: oID,
      //             selectOID: ouser_ID,
      //             selectdbook_ID: obook_ID,
      //             chooseReservationDate: oreservationDate
      //             //  DueDate         : "2024-2-3"
      //           }
      //         ]
      //       });
      //     this.getView().setModel(newBorrowModel, "newBorrowModel");

      //     // if (!this.oReserveBooksDialog) {
      //     //   this.oReserveBooksDialog = this.loadFragment("reservebooks"); // Load your fragment asynchronously
      //     // }
      //     // this.oReserveBooksDialog.open();
      //     var oView = this.getView();
      //     if (!this.oReserveBooksDialog) {
      //       this.oReserveBooksDialog = Fragment.load({
      //         id: oView.getId(),
      //         name: "com.app.project1.fragments.reservebooks",
      //         controller: this
      //       }).then(function (oDialog) {
      //         // oView.addDependent(oDialog);
      //         oDialog.setModel(newBorrowModel);
      //         return oDialog;
      //       });
      //     }
      //     this.oReserveBooksDialog.then(function (oDialog) {
      //       // Create a filter for the binding
      //       // oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
      //       // Open ValueHelpDialog filtered by the input's value
      //       oDialog.open();
      //     });
      //   }
      // },
      onBorrowNewBookPress: async function (oEvent) {
        console.log(
          this.byId("idBooksTable")
            .getSelectedItem()
            .getBindingContext()
            .getObject()
        );
        var oSelectedItem = oEvent.getSource().getParent();
        console.log(oSelectedItem);
        console.log(oEvent.getSource().getBindingContext().getObject());
        console.log(oEvent.getParameters());
        var oSelectedUser = oSelectedItem.getBindingContext().getObject();
        if (this.byId("idBooksTable").getSelectedItems().length > 1) {
          MessageToast.show("Please Select only one Book");
          return;
        }
        var oSelectedBook = this.byId("idBooksTable")
          .getSelectedItem()
          .getBindingContext()
          .getObject();
        console.log(oSelectedBook);
        const userModel = new sap.ui.model.json.JSONModel({
          user_ID: oSelectedUser.ID,
          book_ID: oSelectedBook.ID,
          reservationDate: new Date(),
        });
        this.getView().setModel(userModel, "userModel");
        const oPayload = this.getView().getModel("userModel").getProperty("/"),
          oModel = this.getView().getModel("ModelV2");
        try {
          await this.createData(oModel, oPayload, "/Reservations");
          sap.m.MessageBox.success("Book Reserved");
          //this.getView().byId("idIssueBooks").getBinding("items").refresh();
          //this.oCreateBooksDialog.close();
        } catch (error) {
          //this.oCreateBooksDialog.close();
          sap.m.MessageBox.error("Some technical Issue");
        }
      },
    
      // onBorrowNewBookPress: async function (oEvent) {
      //   var oSelectedItem = oEvent.getSource();
      //   //console.log(oSelectedItem)
      //   console.log(this.ID)
      //   console.log(oEvent.getSource().getParent())
      //   var userId = this.ID
      //   if (this.byId("iduserBookTable").getSelectedItems().length > 1) {
      //     MessageToast.show("Please Select only one Book");
      //     return
      //   }
      //   var oSelectedBook = this.byId("iduserBookTable").getSelectedItem().getBindingContext().getObject()
      //   console.log(oSelectedBook)
 
      //   const userModel = new sap.ui.model.json.JSONModel({
      //     user_ID: userId,
      //     book_ID: oSelectedBook.ID,
      //     reservedDate: new Date(),
      //   });
      //   this.getView().setModel(userModel, "userModel");
 
      //   const oPayload = this.getView().getModel("userModel").getProperty("/"),
      //     oModel = this.getView().getModel("ModelV2");
 
      //   try {
      //     await this.createData(oModel, oPayload, "/Issuances");
      //     MessageBox.success("Book Reserved");
      //   } catch (error) {
      //     //this.oCreateBooksDialog.close();
      //     MessageBox.error("Some technical Issue");
      //   }
      // },
      onCloseReserveBooks: function () {
        if (this.oReserveBooksDialog.isOpen()) {
            this.oReserveBooksDialog.close()
        }
      }
    });

  }
);