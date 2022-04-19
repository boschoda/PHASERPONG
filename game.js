var game = new Phaser.Game(800,600,Phaser.AUTO,null,{
    preload: preload, 
    create: create, 
    update: update
});

var paddle;
var paddle1;
var paddle2;
var ball;
var ball_launched;
var ball_velocity;

function preload(){
    game.load.image('paddle','assets/images/paddle.png');
    game.load.image('ball','assets/images/ball.png');
}

function create(){
    game.add.image(32,256,'paddle');
    
    ball_launched = false;
    ball_velocity = 400;
    paddle1 = create_paddle(0,game.world.centerY);
    paddle2 = create_paddle(game.world.width - 16,game.world.centerY); 
    ball = create_ball(game.world.centerX,game.world.centerY);

    game.input.onDown.add(launch_ball, this);
}

function update(){
    control_paddle(paddle1,game.input.y);
}

function create_paddle(x,y){
    paddle = game.add.sprite(x,y,'paddle');
    paddle.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;

    return paddle;
}

function control_paddle(paddle,y){
    paddle.y = y;

    if(paddle.y < paddle.height / 2){
        paddle.y = paddle.height / 2;
    } else if (paddle.y > game.world.height - paddle.height / 2){
        paddle.y = game.world.height - paddle.height / 2;
} 
}

function create_ball(x,y){
    ball = game.add.sprite(x,y,'ball');
    ball.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1,1);

    return ball;
}

function launch_ball(){
    if(ball_launched){
        ball.x = game.world.centerX;
        ball.y = game.world.centerY;
        ball.body.velocity.setTo(0,0);
        ball_launched = false;
    }else {
        ball.body.velocity.x = -ball_velocity;
        ball.body.velocity.y = ball_velocity;
        ball_launched = true;
}
}
