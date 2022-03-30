function main() {
  function btnCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const canvasContent = canvas.getContext("2d");
    canvasContent.strokeStyle = "white";
    canvasContent.strokeRect(10, 0, 180, 58);
  }




  function championRole(){
    document.querySelectorAll('.nav-wrap .role-list .role').forEach((el)=>{
      el.addEventListener('click',(event)=>{

        const roleIndex = el.dataset.role;

        document.querySelector('.nav-wrap .role-list .role.active').classList.remove('active')
        event.currentTarget.classList.add('active')

        document.querySelectorAll('.video-section .video-wrap video').forEach((el)=>{
          el.classList.remove('on')
          if(el.dataset.role == roleIndex){
            console.log(el.classList.add('on'))
          }
        })
        circleFocusMove();
        roleImageOverap(roleIndex);
      })
    })
  }

  function circleFocusMove(){
    const xPos = document.querySelector('.role-list .role.active').offsetLeft + ((document.querySelector('.role-list .role.active').clientWidth)/2)
    const adjustxPos = xPos - 6
    // after 태그로 하면 이런 문제가 생기네.. div를 새로 만들어야 js에서 접근하기가 용이해. 지금은 괜찮지만 px 값이 바뀌면 문제가 되니까..
    document.querySelector('.focus-circle').style.left = adjustxPos + 'px'
  }




  function roleImageOverap(roleIndex){
    if(!!document.querySelector('.desc-section .role-image img.prev')){
      document.querySelector('.desc-section .role-image img.prev').classList.remove('prev')
    }
    document.querySelector('.desc-section .role-image img.active').classList.replace('active', 'prev')
    document.querySelector(`.desc-section .role-image img[data-role=${roleIndex}]`).classList.add('active')
  }


  function section4Paral(){
    document.querySelector('.section4').addEventListener('mousemove',(e)=>{
      let translateMax = 10
      let rect = e.currentTarget.getBoundingClientRect();
      let xPos = e.clientX - rect.left;
      let yPos = e.clientY - rect.top;
      let secWidth = document.querySelector('.section4').clientWidth
      let secHeight = document.querySelector('.section4').clientHeight
      let xMove = (xPos / secWidth) * translateMax
      let yMove = (yPos / secHeight) * translateMax
      
      document.querySelector('.section4 .sec4-bg1').style.backgroundPosition = `-${xMove}px -${yMove}px`
      document.querySelector('.section4 .sec4-bg2').style.backgroundPosition = `${xMove}px ${yMove}px`
    });

  }

  function rotateSlide(){
    let index = 0;

    setTimeout(()=>{
      document.querySelectorAll('.style-box .item').forEach((el)=>{
        el.classList.remove('active')
      })
      index++;
      document.querySelectorAll('.style-box .item')[index].classList.add('active')

      
      setInterval(()=>{
        document.querySelectorAll('.style-box .item').forEach((el)=>{
          el.classList.remove('active')
        })
        index++;
        if(index >= document.querySelectorAll('.style-box .item').length){
          index = 0;
        }
        document.querySelectorAll('.style-box .item')[index].classList.add('active')
      }, 5000)

    },2500)




  }


  function mapSwiper(){
    
    document.querySelector('.section5 .swiper .map-list').addEventListener('click',(e)=>{
      if(e.target.matches('.map')){
        if(e.target.matches('.active')) return false;

        document.querySelectorAll('.section5 .swiper .map-list .map').forEach((el)=>{
          el.classList.remove('active')
        })
        e.target.classList.add('active')
        
        if(window.innerWidth >= 768){
          const moveYpos = 90;
          const index = (e.target.dataset.index * 1) - 1
          const carculated = (moveYpos * index) ;
          console.log(carculated)        
          document.querySelector('.section5 .swiper .map-list').style.transform = `translateY(-${carculated}px)`
        } else{
          document.querySelector('.section5 .swiper .map-list').style.transform = `translateY(0px)`
        }


        const mapData = e.target.dataset.map;
        if(document.querySelector('.section5 .map-video video.prev')){
          document.querySelector('.section5 .map-video video.prev').classList.remove('prev')
        }

        document.querySelector('.section5 .map-video video.active').classList.replace('active','prev')
        document.querySelectorAll('.section5 .map-video video').forEach((el)=>{
          if (el.dataset.map == mapData){
            el.classList.add('active')
          } else{
            el.classList.remove('active')
          }
        })
        document.querySelectorAll('.sec5-bg').forEach((el) =>{
          if(el.dataset.map == mapData){
            el.classList.add('on')
          } else{
            el.classList.remove('on')
          }
        })

      }
    })
  }


  function bgZoomin(){

    let xPos
    let yPos 
    let xPercent 
    let yPercent
    let zoomPercent = 0;
    let timerPos
    let timerZoom

    if(window.innerWidth >= 1024){

      document.querySelector('.section6').addEventListener('mousedown',()=>{
        document.querySelector('.section6 svg').classList.add('hide')
        document.querySelector('.section6 .desc').classList.add('hide')
        timerZoom = setInterval(()=>{
          zoomPercent++
          if(zoomPercent >= 200){
            clearInterval(timerZoom)
          }
        },10)
        
        timerPos = setInterval(() => {
          document.querySelector('.section6').style.backgroundPosition = `${xPercent}% ${yPercent}%`
          document.querySelector('.section6').style.backgroundSize = `${100 + zoomPercent}%`
        }, 10);
      })
      document.querySelector('.section6').addEventListener('mousemove',(e)=>{
        xPos =  e.clientX -e.target.getBoundingClientRect().left
        yPos = e.clientY - e.target.getBoundingClientRect().top
        xPercent = (xPos / document.querySelector('.section6').clientWidth) * 100
        yPercent = (yPos / document.querySelector('.section6').clientHeight) * 100
      })
      document.querySelector('.section6').addEventListener('mouseup',()=>{
  
        document.querySelector('.section6 svg').classList.remove('hide')
        document.querySelector('.section6 .desc').classList.remove('hide')
        clearInterval(timerZoom)
        clearInterval(timerPos)
        requestAnimationFrame(()=>{
          document.querySelector('.section6').style.backgroundPosition = `50% 50%`
          document.querySelector('.section6').style.backgroundSize = `100%`
        })
  
        zoomPercent = 0;
      })
      document.querySelector('.section6').addEventListener('mouseleave',()=>{
        document.querySelector('.section6 svg').classList.remove('hide')
        document.querySelector('.section6 .desc').classList.remove('hide')
        clearInterval(timerZoom)
        clearInterval(timerPos)
        requestAnimationFrame(()=>{
          document.querySelector('.section6').style.backgroundPosition = `50% 50%`
          document.querySelector('.section6').style.backgroundSize = `100%`
        })
        zoomPercent = 0;
      })
    }
  }


  let options = {
    rootMargin: '0px',
    threshold: 0.6
  }


  let observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach((target)=>{
      console.log(target.isIntersecting)
      if(target.isIntersecting){
        document.querySelector('.section6 svg').classList.remove('hidden')
      }
    })
  }, options);
  const taget = document.querySelector('.section6')
  

  
  observer.observe(taget)
  

  btnCanvas("play-free-btn");
  championRole()
  circleFocusMove()
  section4Paral()  ;
  mapSwiper();
  rotateSlide();
  bgZoomin();


  window.addEventListener('resize',()=>{
    circleFocusMove()
    bgZoomin()
    if(window.innerWidth <= 768){
      document.querySelector('.section5 .swiper .map-list').style.transform = `translateY(0px)`
    }
      
  })

}

window.addEventListener("DOMContentLoaded", main);
