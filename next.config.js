module.exports = {
    env: {
        db_apiKey: "AIzaSyBWOQx-CEVHDIxQ4J9b9v3R2Qzhcjsxw54",
        db_authDomain: "finnikky-a405e.firebaseapp.com",
        db_databaseURL: "https://finnikky-a405e.firebaseio.com",
        db_projectId: "finnikky-a405e",
        db_storageBucket: "finnikky-a405e.appspot.com",
        db_messagingSenderId: "751763113401",
        db_appId: "1:751763113401:web:0b5a4f537eb89f7615e268",
        db_measurementId: "G-1RP62DBYJB",
        firebase_client_email: "firebase-adminsdk-ar1qw@finnikky-a405e.iam.gserviceaccount.com",
        firebase_private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzay5+ySTg+Ffe\n7xYyw9LtF85hzN7X26UajNRk3VKAwOoiAcvK8QswfdynvPwHWLQvM6Dboz+ViWB+\nK/AVTY17lmvgqh0yN633CQcb8g9V6nLGZkJ4G2mENlygWuoY9u+8FEteFBX1IrVC\nP5/qItEKidD9ieqOGYGbObTIODL9IZxEC2EuYbCZgQpkdEvwdi3czxg99SV68cru\nYwEBzA3mQUSZzd9EpNdWHFCtAT6iQBPmHvEkUg4hwsHmF2QkvN5GQSf2XFBnZdtK\n/F+hnK/VP+m3xtcLpGkCSPSwbppAX1kpSSB9BM8fyTZ/bw+95K6NmuAHtlOBuYmF\nN/jGdC37AgMBAAECggEAS7eUYCIv45c6shTxJ8xXdAJjcQeeFbeWlj1Plx+F5VtE\nk8RxRjxybez31XweWlVXeUIPBRIAT/GxXJ3bTIo1hq4E6cOw3ZP84S+YpfUB/s6Z\n0FuwenKLFaZBcdTcTVvM8XEZG2Nbnt+eYg5qxMsbsBhYL99nsr9V4HW6cvKwpf02\nhdVu+XKFRAFUCSvwV3W59Kup0KB3uhxeQRtP587EKTKPfVhWVdlVLBCpIJZlsc9x\n+VEpdT6qdOaEBIaN8RcTt7kkXLjj4/hko4WZs/iEhoEgE+l8FgMDO8D7EOu/mLQB\nVeBBainJ9p+KlCu7xu3X2HoOWvmvl3bQgZHSoPpUvQKBgQDxQAa/nV6jwuEGT6uD\nJtLCEalrZUMUdX5l1Qvs9Kus30VuWnOaPw4KA0hB8WRHhOOyqTwRaBFzYwhxyqo1\n16Ka1ZwAHy64ItxvG7zf8eDqJsv48jVvAJHXZwYLoJNxqBdr1BxdFOj2gJH72OJj\nIMAfUMFkCsXWNmLDYb9u9bhmfQKBgQC+Y2N08HqqG7Fr7zRyP7aA1WR937H3TXPy\naDql7juUCuDlNfbD3Yu0LPyF+gR0dDbHbVmMWSRJy538RkIhkp7FRuIM8sEW4Ndy\nGZiKSLTnetXA3KgdwQXiu8o1SpGxYuG3asqlbB/ARk5yNB97FUMwogrj5FFfR7KT\nd5w1nVp31wKBgQDLkfBf3iYO35HMJowedjMfqZGhWug4qlBHE3glsevvStOmo9Kq\nlIx/LHfblRq+MseEacOTGJKpICbvBkmMd3HxX1Bs1eMxY9FIPEqrWcolKymw3ojy\nKrPl5Dw4sX3ZSTLCPVDVxqAx6RnGPyQA65DSm+0kQubftDKwlZnYwqWgbQKBgFUq\n1sHoFadlDgAvmHGHSNfnHbYlTFJJppWIxLuXj7VRDHvcoQ/LWoR2H1y7lCSYHC0o\nIIflFJOib4D72Pd1xGqRo+uQ6ImYeShEhPVPQwXN8DL/QoFU6JId2X3vZq9IgZpw\nPkizzpxPlyYFZRPFVjI6Os7pQvFxfFP1jL57Lo4vAoGATaIrjMxtrFvcTjzzByFq\nmfPPly6MrieyyJvwmZz39d5+31W54mUDOBUZvS9NW5MYM/0oZNU+lbIdep+npWq3\n8J5YRdp3dC36pfPe8tBwwjY1daI6v58nV60i3Dfp2B6HVDFNNU24Bxkt+Lkiet5t\nfZtG4PS5iNj1iTMSLW4cHDs=\n-----END PRIVATE KEY-----\n"
    },
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
          config.node = {
            fs: 'empty'
          }
        }
    
        return config
      }
  }