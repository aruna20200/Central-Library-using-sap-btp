sap.ui.define(
  [
    "./Basecontroller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Token",
    "sap/ui/model/json/JSONModel"
  ],
  function (
    Controller,
    Filter,
    FilterOperator,
    Token
  ) {
    "use strict";

    return Controller.extend("com.app.project1.controller.admin", {
      onInit: function () {

        debugger
        const oLocalModel = new sap.ui.model.json.JSONModel({
          title: "",
          author: "",
          ISBN: "",
          quantity: 0,
        });


        this.getView().setModel(oLocalModel, "localModel");
        this.getRouter().attachRoutePatternMatched(this.onBookListLoad, this);


        const oView1 = this.getView();
        const oMulti1 = oView1.byId("idAuthorFilterValue");
        const oMulti2 = oView1.byId("idTitleFilterValue");
        const oMulti3 = oView1.byId("idISBNFilterValue");



        let validae = function (arg) {
          if (true) {
            var text = arg.text;
            return new Token({ key: text, text: text });
          }
        };
        oMulti1.addValidator(validae);
        oMulti2.addValidator(validae);
        oMulti3.addValidator(validae);
      },

      onGoPress: function (ev) {
        const oView = this.getView(),
          oauthorFilter = oView.byId("idAuthorFilterValue"),
          oTitleFilter = oView.byId("idTitleFilterValue"),
          oISBNFilter = oView.byId("idISBNFilterValue"),

          sauthor = oauthorFilter.getTokens(),
          sTitle = oTitleFilter.getTokens(),
          sISBN = oISBNFilter.getTokens(),
          oTable = oView.byId("idBooksTable"),
          bFilters = [];
        sauthor.filter((ele) => {
          ele
            ? bFilters.push(
              new Filter("author", FilterOperator.EQ, ele.getKey())
            )
            : "";
        });
        sTitle.filter((ele) => {
          ele
            ? bFilters.push(
              new Filter("title", FilterOperator.EQ, ele.getKey())
            )
            : "";
        });
        sISBN.filter((ele) => {
          ele
            ? bFilters.push(
              new Filter("ISBN", FilterOperator.EQ, ele.getKey())
            )
            : "";
        });



        oTable.getBinding("items").filter(bFilters);
      },
      onCreateBtnPress: async function () {
        if (!this.odialogbox2) {
          this.odialogbox2 = await this.loadFragment("Create");
        }
        this.odialogbox2.open();
      },
      onActiveloans: async function () {
        if (!this.odialogbox3) {
          this.odialogbox3 = await this.loadFragment("activeloans");
        }
        this.odialogbox3.open();
      },
      //for closing the ActiveLoans popup...
      onCloseActiveLoans: function () {
        if (this.odialogbox3.isOpen()) {
          this.odialogbox3.close();
        }

        // location.reload();
      },

// June 3rd issue books
onissuebooks: async function () {
  if (!this.issueBooksDialog) {
      this.issueBooksDialog = await this.loadFragment("issuebooks")
  }
  this.issueBooksDialog.open();
},
onissuebookscancelbtn: function () {
  if (this.issueBooksDialog.isOpen()) {
      this.issueBooksDialog.close()
  }
},
// on Accept june 3rd
onReservebtnpress: async function (oEvent) {
  console.log(this.byId("issuebooksTable").getSelectedItem().getBindingContext().getObject())
  // var oSelectedItem = oEvent.getSource().getParent();
  // console.log(oSelectedItem)
  // console.log(oEvent.getSource().getBindingContext().getObject())
  // console.log(oEvent.getParameters())
  // var oSelectedUser = oSelectedItem.getBindingContext().getObject();
  if(this.byId("issuebooksTable").getSelectedItems().length>1){
      MessageToast.show("Please Select only one Book");
      return
  }
  var oSelectedBook=this.byId("issuebooksTable").getSelectedItem().getBindingContext().getObject()
  //june 4th Avaliable quantity
  console.log(oSelectedBook)

  const userModel = new sap.ui.model.json.JSONModel({
      book_ID : oSelectedBook.book.ID,
      user_ID: oSelectedBook.user.ID,
      issuedate: new Date(),
      returndate:new Date()
  });
  this.getView().setModel(userModel, "userModel");

  const oPayload = this.getView().getModel("userModel").getProperty("/"),
      oModel = this.getView().getModel("ModelV2");

  try {
      await this.createData(oModel, oPayload, "/Bookloans");
      sap.m.MessageBox.success("Book Accepted");
      //this.getView().byId("idIssueBooks").getBinding("items").refresh();
      //this.oCreateBooksDialog.close();
  } catch (error) {
      //this.oCreateBooksDialog.close();
      sap.m.MessageBox.error("Some technical Issue");
  }
},





      // //on issue books 2nd june
      //       onissuebooks: async function () {
      //         if (!this.odialogbox4) {
      //           this.odialogbox4 = await this.loadFragment("issuebooks");
      //          }
      //          this.odialogbox4.open();

      //       },

      // //for closing the issuebooks popup...
      // onCloseIssueBookPress: function () {
      //   if (this.odialogbox4.isOpen()) {
      //     this.odialogbox4.close();
      //   }

      // location.reload();
      // },


      onCancelDialog2: function () {
        if (this.odialogbox2.isOpen()) {
          this.odialogbox2.close();
        }
        // location.reload();
      },
      onSave: async function () {

        const oPayload = this.getView().getModel("localModel").getProperty("/"),
          oModel = this.getView().getModel("ModelV2");
        try {
          await this.createData(oModel, oPayload, "/Books");
          this.getView().byId("idBooksTable").getBinding("items").refresh();
          this.odialogbox.close();
        } catch (error) {
          this.odialogbox.close();
          sap.m.MessageBox.error("Some technical Issue");
        }
      },
      onBookListLoad: function () {
        this.getView().byId("idBooksTable").getBinding("items").refresh();

      },
      // for Editing the Book  

      oneditBtnPress: async function () {
        var oSelected = this.byId("idBooksTable").getSelectedItem();

        if (oSelected) {
          var oID = oSelected.getBindingContext().getProperty("ID");
          var otitle = oSelected.getBindingContext().getProperty("title");
          var oauthor = oSelected.getBindingContext().getProperty("author");
          var oquantity = oSelected.getBindingContext().getProperty("quantity");
          var oAquantity = oSelected.getBindingContext().getProperty("Aquantity");
          var oISBN = oSelected.getBindingContext().getProperty("isbn");

          var newBookModel = new sap.ui.model.json.JSONModel({
            ID: oID,
            author: oauthor,
            title: otitle,
            quantity: oquantity,
            Aquantity: oAquantity,
            ISBN: oISBN
          });

          this.getView().setModel(newBookModel, "newBookModel");

          if (!this.oEditBooksDialog) {
            this.oEditBooksDialog = await this.loadFragment("editBooks"); // Load your fragment asynchronously
          }

          this.oEditBooksDialog.open();
        }
      },
      //Edit book save function

      onSave1: function () {
        var oPayload = this.getView().getModel("newBookModel").getData();
        var oDataModel = this.getOwnerComponent().getModel("ModelV2");// Assuming this is your OData V2 model
        console.log(oDataModel.getMetadata().getName());

        try {
          // Assuming your update method is provided by your OData V2 model
          oDataModel.update("/Books(" + oPayload.ID + ")", oPayload, {
            success: function () {
              this.getView().byId("idBooksTable").getBinding("items").refresh();
              this.oEditBooksDialog.close();
            }.bind(this),
            error: function (oError) {
              this.oEditBooksDialog.close();
              sap.m.MessageBox.error("Failed to update book: " + oError.message);
            }.bind(this)
          });
        } catch (error) {
          this.oEditBooksDialog.close();
          sap.m.MessageBox.error("Some technical Issue");
        }


        var oDataModel = new sap.ui.model.odata.v2.ODataModel({
          serviceUrl: "https://port4004-workspaces-ws-q45kc.us10.trial.applicationstudio.cloud.sap/odata/v4/catalog/Books",
          defaultBindingMode: sap.ui.model.BindingMode.TwoWay,
          // Configure message parser
          messageParser: sap.ui.model.odata.ODataMessageParser
        })
      },

      onDeleteBtnPress: async function () {

        var oSelected = this.byId("idBooksTable").getSelectedItem();
        if (oSelected) {
          var oISBN = oSelected.getBindingContext().getObject().ISBN;

          oSelected.getBindingContext().delete("$auto").then(function () {
            MessageToast.show(oISBN + " SuccessFully Deleted");
          },
            function (oError) {
              MessageToast.show("Deletion Error: ", oError);
            });
          this.getView().byId("idBooksTable").getBinding("items").refresh();

        } else {
          MessageToast.show("Please Select a Row to Delete");
        }
      },
      onClearFilterPress: function () {
        const oView = this.getView(),
          oTitleFilter = oView.byId("idTitleFilterValue"),
          sTitle = oTitleFilter.removeAllTokens(),
          oAuthorFilter = oView.byId("idAuthorFilterValue"),
          sauthor = oAuthorFilter.removeAllTokens(),
          oIsbnFilter = oView.byId("idISBNFilterValue"),
          sISBN = oIsbnFilter.removeAllTokens();

      },
      //edit book close
      onClose1: function () {
        if (this.oEditBooksDialog.isOpen()) {
          this.oEditBooksDialog.close();
        }
      },

      //june 4th
      onCloseloansBtnPress: async function () {

        var oSelected = this.byId("myTable").getSelectedItem();
        if (oSelected) {
          var oISBN = oSelected.getBindingContext().getObject().ISBN;

          oSelected.getBindingContext().delete("$auto").then(function () {
            MessageToast.show(" SuccessFully Loan is close");
          },
            function (oError) {
              MessageToast.show("Deletion Error: ", oError);
            });
          this.getView().byId("myTable").getBinding("items").refresh();

        } else {
          MessageToast.show("Please Select a Row to closeLoan");
        }
      },

    });
  }
);