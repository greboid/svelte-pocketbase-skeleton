package main

import (
	"log"
	"os"

	_ "backend/migrations"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	//Auto apply migrations
	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: true,
	})
	// serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("./pb_public"), true))
		return nil
	})

	app.OnRecordAfterAuthWithPasswordRequest("users").Add(func(e *core.RecordAuthWithPasswordEvent) error {
		if e.Record.Verified() {
			return nil
		} else {
			return apis.NewApiError(400, "email not yet validated", nil)
		}
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
