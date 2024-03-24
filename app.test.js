
const request = require('supertest');
const app = require('./main');
const path = require("path")
const fs = require("fs")



let server;

beforeAll(() => {
    server = app.listen(3001); // Start the server on a different port for testing
});

afterAll(() => {
    server.close(); // Close the server after all tests are done
});

describe('Global Uncaught Exception Handler', () => {
    test('should log the error and exit the process', () => {
        // Mock process.exit to prevent actual process exit
        const originalExit = process.exit;
        process.exit = jest.fn();

        // Mock console.error to capture the error message
        const originalError = console.error;
        console.error = jest.fn();

        // Simulate an uncaught exception
        process.emit('uncaughtException', new Error('Simulated uncaught exception'));

        // Expect console.error to be called with the error message
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Simulated uncaught exception'));

        // Expect process.exit to be called with code 1
        expect(process.exit).toHaveBeenCalledWith(1);

        // Restore the original functions
        process.exit = originalExit;
        console.error = originalError;
    });
});

describe('GET /robots.txt', () => {
    test('should return status 200 and the content of robots.txt', async () => {
        // Mock the fs.createReadStream function to return a readable stream
        const mockReadStream = jest.spyOn(fs, 'createReadStream').mockReturnValueOnce(
            fs.createReadStream(path.join(__dirname, 'robots.txt'), { encoding: 'utf8' }), 100000
        );

        const response = await request(app).get('/robots.txt');

        // Assert the response
        expect(response.status).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('User-agent'));

        // Restore the mocked function
        mockReadStream.mockRestore();
    });

    test('should handle errors gracefully', async () => {
        // Mock the fs.createReadStream function to throw an error
        const mockReadStream = jest.spyOn(fs, 'createReadStream').mockImplementationOnce(() => {
            throw new Error('Mocked error');
        });

        const response = await request(app).get('/robots.txt');

        // Assert the response
        expect(response.status).toBe(500);
        expect(response.text).toBe('Internal Server Error');

        // Restore the mocked function
        mockReadStream.mockRestore();
    });
});

describe('404 Error Handling', () => {
    it('should respond with HTML for HTML requests', async () => {
      const response = await request(app)
        .get('/non-existing-route')
        .set('Accept', 'text/html');
  
      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toMatch(/text\/html/);
    });
  
    it('should respond with JSON for JSON requests', async () => {
      const response = await request(app)
        .get('/non-existing-route')
        .set('Accept', 'application/json');
  
      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body.error).toBe('404 Not Found');
    });
  
    it('should respond with plain text for other requests', async () => {
      const response = await request(app)
        .get('/non-existing-route')
        .set('Accept', 'text/plain');
  
      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toMatch(/text\/plain/);
      expect(response.text).toBe('404 Not Found');
    });
  });


