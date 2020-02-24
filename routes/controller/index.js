const {
    pool
} = require('../db')

module.exports = {
    insert: async (req, res) => {
        try {
            let {
                name,
                email
            } = req.body

            var user = await pool.query('SELECT * FROM users WHERE "email" = $1', [email])

            if (user.rows.length >= 1) return res.status(200).send({
                success: false,
                message: "User already signup"
            })
            const query = {
                text: 'INSERT INTO users("name", "email") VALUES($1, $2) RETURNING *',
                values: [name, email],
            }
            pool.query(query).then(result => {
                res.status(200).send({
                    success: true,
                    message: "success",
                    data: result.rows
                })
            }).catch(er => {
                console.log(er)
                res.status(200).send({
                    success: false,
                    message: "failed"
                })
            })

        } catch (error) {
            console.log("ee", error)
            res.status(500).send({
                success: false,
                message: "Internal server error"
            })
        }
    },
    delete: async (req, res) => {
        try {
            let {
                email
            } = req.body
            const query = {
                text: 'DELETE FROM users WHERE "email" = $1',
                values: [email],
            }

            pool.query(query).then(result => {

                res.status(200).send({
                    success: true,
                    message: `${email} user delete success`
                })
            }).catch(er => {
                console.log("delete user error", er)
                res.status(200).send({
                    success: false,
                    message: "failed please try again"
                })
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: "Internal server error"
            })
        }
    },
    getAlluser: async (req, res) => {

        pool.query('SELECT * FROM users', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })

    },
    getSingleUser: async (req, res) => {
        try {

            const email = req.body.email
            pool.query('SELECT * FROM users WHERE "email" = $1', [email], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).json(results.rows)
            })

        } catch (error) {
            console.log(error)
            res.status(500).send("failed")
        }
    },
    updateUser: (req, res) => {
        const id = req.query.id
        const {
            name,
            email
        } = req.body
        pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3',
            [name, email, id],
            (error, results) => {
                if (error) {
                    console.log(error)
                    throw error
                }
                res.status(200).send(`User modified with ID: ${id}`)
            }
        )
    }
}