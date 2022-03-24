import React from 'react';


export default class NextStage extends React.PureComponent{

    componentDidMount() {
     ShowCustomDialog();
  }
	
    render() {
  		function ShowCustomDialog()
			{
                
			ShowDialogBox('Warning','Record updated successfully.','Ok','', 'GoToAssetList',null);
			}

            function ShowDialogBox(title, content, btn1text, btn2text, functionText, parameterList) {
                var btn1css;
                var btn2css;

                if (btn1text == '') {
                    btn1css = "hidecss";
                } else {
                    btn1css = "showcss";
                }

                if (btn2text == '') {
                    btn2css = "hidecss";
                } else {
                    btn2css = "showcss";
                }
                $("#lblMessage").html(content);

                $("#dialog").dialog({
                    resizable: false,
                    title: title,
                    modal: true,
                    width: '400px',
                    height: 'auto',
                    bgiframe: false,
                    hide: { effect: 'scale', duration: 400 },

                    buttons: [
                                    {
                                        text: btn1text,
                                        "class": btn1css,
                                        click: function () {
                                                                                    
                                            $("#dialog").dialog('close');

                                        }
                                    },
                                    {
                                        text: btn2text,
                                        "class": btn2css,
                                        click: function () {
                                            $("#dialog").dialog('close');
                                        }
                                    }
                                ]
                });
            }


     return (
         <div id="dialog" title="Alert message" style="display: none">
            <div class="ui-dialog-content ui-widget-content">
                <p>
                    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0"></span>
                    <label id="lblMessage">
                    </label>
                </p>
            </div>
        </div>
     );
   }
 }