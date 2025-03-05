fetch('http://127.0.0.1:3000/api/v1/users')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Users:', data.data);
        } else {
            console.error('Error:', data.message);
        }
    })
    .catch(error => console.error('Fetch error:', error));
