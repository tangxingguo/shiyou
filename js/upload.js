$('#photo').change(function(){  
                var _this = $(this)[0],  
                    _file = _this.files[0],  
                    fileType = _file.type;  
                    console.log(_file.size);  
                if(/image\/\w+/.test(fileType)){  
                    $.notify.show('图片上传中...', function(){});  
                    var fileReader = new FileReader();  
                    fileReader.readAsDataURL(_file);  
                    fileReader.onload = function(event){  
                        var result = event.target.result;   //返回的dataURL  
                        var image = new Image();  
                        image.src = result;  
                        image.onload = function(){  //创建一个image对象，给canvas绘制使用  
                            var cvs = document.createElement('canvas');  
                            var scale = 1;    
                            if(this.width > 1000 || this.height > 1000){  //1000只是示例，可以根据具体的要求去设定    
                                if(this.width > this.height){    
                                    scale = 1000 / this.width;  
                                }else{    
                                    scale = 1000 / this.height;    
                                }    
                            }  
                            cvs.width = this.width*scale;    
                                            cvs.height = this.height*scale;     //计算等比缩小后图片宽高  
                            var ctx = cvs.getContext('2d');    
                            ctx.drawImage(this, 0, 0, cvs.width, cvs.height);     
                                          var newImageData = cvs.toDataURL(fileType, 0.8);   //重新生成图片，<span style="font-family: Arial, Helvetica, sans-serif;">fileType为用户选择的图片类型</span>  
                            var sendData = newImageData.replace("data:"+fileType+";base64,",'');  
                            $.post('/user/personalchange',{type:'photo',value:sendData},function(data){  
                                if(data.code == '200'){  
                                    $('.modify_img').attr('src',newImageData);  
                                    $.notify.close();  
                                }else{  
                                    $.notify.show(data.message, {placement: 'center'});  
                                }  
                            });  
                        }  
                          
                    }  
                }else{  
                    $.notify.show('请选择图片格式文件', {placement: 'center'});  
                }  
            });  