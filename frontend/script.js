document.addEventListener('DOMContentLoaded', () => {
    const memeCanvas = document.getElementById('memeCanvas');
    const ctx = memeCanvas.getContext('2d');
    let selectedImage;
  
    const imageUpload = document.getElementById('imageUpload');
    imageUpload.addEventListener('change', handleImageUpload);
  
    const topTextInput = document.getElementById('topText');
    const bottomTextInput = document.getElementById('bottomText');
  
    topTextInput.addEventListener('input', generateMeme);
    bottomTextInput.addEventListener('input', generateMeme);
  
    const downloadButton = document.getElementById('downloadMeme');
    downloadButton.addEventListener('click', downloadMeme);
  
    const shareTwitterButton = document.getElementById('shareTwitter');
    shareTwitterButton.addEventListener('click', () => shareMeme('twitter'));
  
    const shareFacebookButton = document.getElementById('shareFacebook');
    shareFacebookButton.addEventListener('click', () => shareMeme('facebook'));
  
    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.onload = function() {
            drawImageScaled(img);
          };
          img.src = e.target.result;
          selectedImage = img;
        };
        reader.readAsDataURL(file);
      }
    }
  
    function drawImageScaled(img) {
      memeCanvas.width = img.width;
      memeCanvas.height = img.height;
      ctx.drawImage(img, 0, 0, memeCanvas.width, memeCanvas.height);
      generateMeme(); // Generate meme after image upload
    }
  
    function generateMeme() {
      if (!selectedImage) return;
  
      // Clear canvas
      ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
  
      // Redraw the uploaded image
      ctx.drawImage(selectedImage, 0, 0, memeCanvas.width, memeCanvas.height);
  
      // Draw top text
      const topText = topTextInput.value;
      ctx.font = '30px Impact';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(topText, memeCanvas.width / 2, 40);
  
      // Draw bottom text
      const bottomText = bottomTextInput.value;
      ctx.fillText(bottomText, memeCanvas.width / 2, memeCanvas.height - 20);
    }
  
    function clearInputs() {
      // Clear input text fields
      topTextInput.value = '';
      bottomTextInput.value = '';
    }
  
    function downloadMeme() {
      const link = document.createElement('a');
      link.href = memeCanvas.toDataURL('image/png');
      link.download = 'meme.png';
      link.click();
      clearInputs(); // Clear input text fields after downloading
    }
  
    function shareMeme(platform) {
      const dataUrl = memeCanvas.toDataURL('image/png');
      if (platform === 'twitter') {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this meme!')}`;
        window.open(url, '_blank');
      } else if (platform === 'facebook') {
        const url = `https://www.facebook.com`;
        window.open(url, '_blank');
      } else if (platform === 'instagram') {
        const url = `https://www.instagram.com`;
        window.open(url, '_blank');
      }
      clearInputs(); // Clear input text fields after sharing
    }
  });
  