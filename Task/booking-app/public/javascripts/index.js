$(document).ready(()=>{
    $("#submit").on("click",()=>{
        
        let email={
            email:$("#email").val(),
            password:$("#password").val(),
            content:`Dear ${$("#name").val()} your regestration was done successfuly for ${$("#datetime").val()}`
        }
        
        $.post("http://127.0.0.1:4000/send",email).then(()=>console.log("hello"))
    })
})